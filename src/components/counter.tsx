import { CentredBox } from './styles';

interface Props {
  value: number;
  onValueChange(newValue: number): void;
  minValue?: number;
}

export const Counter: React.FunctionComponent<Props> = props => {
  const minValue = props.minValue ?? 0;
  const maxValue = 99;
    
  const plusDisabled = props.value === maxValue;
  const minusDisabled = props.value === minValue;

  const handleValueChange = (newValue: number) => {
    props.onValueChange(newValue);
  };

  return (
    <CentredBox $width={80}>
      <div style={{textAlign: 'right', width: '25px', paddingRight: '8px'}}>{props.value}</div>
      <button disabled={minusDisabled} onClick={() => { handleValueChange(props.value - 1); }}>- </button>
      <button disabled={plusDisabled} onClick={() => { handleValueChange(props.value + 1); }}>+</button>
    </CentredBox>
  );
};
