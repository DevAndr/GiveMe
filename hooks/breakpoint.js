import React, {createContext, useContext, useEffect, useState} from 'react';

const defaultValue = {}

const BreakpointContext = createContext(defaultValue);

const BreakpointProvider = ({children, queries}) => {
    const [queryMatch, setQueryMatch] = useState({name: "xl"});

    useEffect(() => {
        const mediaQueryLists = {};
        const keys = Object.keys(queries);
        let isAttached = false;

        const handleQueryListener = () => {
            const updatedMatches = keys.reduce((acc, media) => {
                acc[media] = !!(mediaQueryLists[media] && mediaQueryLists[media].matches);
                return acc;
            }, {})

            let cur = {}

            Object.keys(updatedMatches).map((k) => {
                if (!cur?.name && updatedMatches[k]) {
                    cur['name'] = k
                }
            })

            if (!cur?.name)
                cur['name'] = 'xl'

            setQueryMatch(cur)
        }

        if (window && window.matchMedia) {
            const matches = {};
            keys.forEach(media => {
                if (typeof queries[media] === 'string') {
                    mediaQueryLists[media] = window.matchMedia(queries[media]);
                    matches[media] = mediaQueryLists[media].matches
                } else {
                    matches[media] = false
                }
            });

            let cur = {}

            Object.keys(matches).map((k) => {
                if (matches[k])
                    cur['name'] = k
            })

            if (!cur?.name)
                cur['name'] = 'xl'

            setQueryMatch(cur);
            isAttached = true;
            keys.forEach(media => {
                if (typeof queries[media] === 'string') {
                    mediaQueryLists[media].addListener(handleQueryListener)
                }
            });
        }

        return () => {
            if (isAttached) {
                keys.forEach(media => {
                    if (typeof queries[media] === 'string') {
                        mediaQueryLists[media].removeListener(handleQueryListener)
                    }
                });
            }
        }
    }, [queries]);

    return (
        <BreakpointContext.Provider value={queryMatch}>
            {children}
        </BreakpointContext.Provider>
    )

}

function useBreakpoint() {
    const context = useContext(BreakpointContext);

    if (context === defaultValue) {
        throw new Error('useBreakpoint must be used within BreakpointProvider');
    }
    return context;
}

export {useBreakpoint, BreakpointProvider};
