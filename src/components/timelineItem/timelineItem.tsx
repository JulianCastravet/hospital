import { TimelineItemProps } from "antd";
import { formatTime } from "../../utils/formatTime";

interface TimeProps extends TimelineItemProps {
  date: string;
  doctor: string;
}

const TimelineItem = (props: TimeProps) => {
  const { label, date, doctor } = props;

  return (
    <div className="flex flex-col">
      <span className="text-gray-500 font-bold text-base">{label}</span>
      <span className="text-gray-500 text-sm">
        {formatTime(date, "DD MMMM YYYY")}
      </span>
      <span className="text-gray-500">{doctor}</span>
    </div>
  );
};

export default TimelineItem;
