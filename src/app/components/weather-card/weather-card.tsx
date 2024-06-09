interface ElementProps {
  title: string;
  value: string;
}

const WeatherCard = ({ title, value }: ElementProps) => {
  return (
    <div className="border-cyan-400 flex-1 border-2 rounded-md p-4 flex flex-col gap-2">
      <p className="text-gray-400 font-medium text-sm">{title}</p>

      <p className="text-white font-semibold text-2xl">{value}</p>
    </div>
  );
};

export default WeatherCard;
