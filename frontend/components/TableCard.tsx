type CardProps = {
    title: string;
    action?: React.ReactNode;
    children: React.ReactNode;
};

const Card = ({ title, action, children }: CardProps) => {
    return (
        <div className="w-full h-full bg-white border border-zinc-200 rounded-xl p-5 flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-zinc-900">
                    {title}
                </h2>

                {action}
            </div>

            <div className="flex-1">{children}</div>
        </div>
    );
};

export default Card;