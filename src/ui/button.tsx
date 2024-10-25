type Props = {
  text: string;
  onClick: () => void;
};

function Button({ text, onClick }: Props) {
  return (
    <div
      className="flex items-center justify-center border-2 bg-blue-800 border-blue-700 rounded-lg m-1 cursor-pointer"
      onClick={onClick}
    >
      {text}
    </div>
  );
}

export default Button;
