import {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    InputHTMLAttributes,
    useState,
} from "react";

export default forwardRef(function ToggleBox({ className = "", isChecked = false, onChange, children, ...props } : InputHTMLAttributes<HTMLInputElement> & { isChecked?: boolean }, ref) {
    const localRef = useRef<HTMLInputElement>(null);
 const [checked, setChecked] = useState<boolean>(isChecked);

    
    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        setChecked(isChecked);
    }, [isChecked]);

    const handleToggle = () => {
        const newChecked: any = !checked;
        setChecked(newChecked);
        if (onChange) {
            onChange(newChecked);
        }
    };

    return (
        <label
            className={`inline-flex items-center cursor-pointer ${className}`}
        >
            <input
                type="checkbox"
                className="sr-only peer"
                ref={localRef}
                checked={checked}
                onChange={handleToggle}
                {...props}
            />
            <div
                className={`relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600`}
            ></div>
            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                {children}
            </span>
        </label>
    );
});
