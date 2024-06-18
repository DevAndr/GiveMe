import React, {FC} from 'react';

interface UserProfileProps {
    name: string | null | undefined;
}

const UserProfile: FC<UserProfileProps> = ({name}) => {
    return (
        <div>
            {name}
        </div>
    );
};

export default UserProfile;