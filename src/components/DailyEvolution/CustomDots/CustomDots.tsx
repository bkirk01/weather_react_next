import { Dot, DotProps } from 'recharts';

const CustomDot: React.FC<DotProps> = props => {
  const { cx, cy } = props;
  return <Dot cx={cx} cy={cy} r={12.5} fill="orange" stroke="orange" />;
};

export default CustomDot;
