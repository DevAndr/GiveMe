export type BreakPointEntries = {
    xs: 1
    sm: 2
    md: 3
    lg: 4
    xl: 5
}

export type WindowDevice = {
    Phone: '(max-width: 320px)'
    LargePhone: '(max-width: 425px)'
    Tablet: '(max-width: 768px)'
    Desktop: '(max-width: 1024px)'
    UltraWide: '(max-width: 1140px)'
}

export enum EnumDevices {
    Phone = '(max-width: 320px)',
    LargePhone = '(max-width: 425px)',
    Tablet = '(max-width: 768px)',
    Desktop = '(max-width: 1024px)',
    UltraWide = '(max-width: 1140px)'
}
