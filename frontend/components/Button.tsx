type ButtonProps = {
    children: React.ReactNode;
    onClick?: () => void;
};

export const Button = ({ children, onClick }: ButtonProps) => {
    return (
        <button
            onClick={onClick}
            className="text-sm px-3 py-1.5 border border-blue-500 text-blue-600 rounded-md hover:bg-blue-50 transition"
        >
            {children}
        </button>
    );
};