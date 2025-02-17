import { TooltipProps } from 'recharts';

import { useCtxCurrentLocation } from '@/context/CtxCurrentLocation';
import './CustomTooltip.css';

const CustomTooltip: React.FC<TooltipProps<number, string>> = ({ active, payload }) => {
  const { unit } = useCtxCurrentLocation();

  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="custom-tooltip-label">{`${payload[0].value}° ${unit}`}</p>
      </div>
    );
  }

  return null;
};

export default CustomTooltip;
