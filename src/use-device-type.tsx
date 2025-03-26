import * as React from 'react';

const useDeviceType = (): {deviceType: string} => {
    const getDeviceType = React.useCallback((height: number): string => {
        if (height < 600) return 'Mobile';
        if (height < 900) return 'Tablet';
        return 'Desktop';
    }, []);

    const [deviceType] = React.useState(() => getDeviceType(window.innerHeight));

    const handleFocus = React.useCallback((event: FocusEvent) => {
        const target = event.target as HTMLElement;
        if (target) {
            const scrollTarget = window.innerHeight * 0.75;
            const targetPosition = target.getBoundingClientRect().top + window.scrollY;
            if (targetPosition > scrollTarget) {
                window.scrollTo({top: scrollTarget, behavior: 'smooth'});
            }
        }
    }, []);
   
    
    React.useEffect(() => {
        document.addEventListener('focus', handleFocus, true);

        return () => {
            document.removeEventListener('focus', handleFocus, true);
        };
    }, [handleFocus]);

    return {deviceType};
};

export default useDeviceType;
