import { Input } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";

const INPUT_TYPE = {
  MIN: "min",
  MAX: "max"
} as const;

interface RangeInputProps {
  initialValue?: [number?, number?];
  onChange: (value: [number?, number?]) => void;
  min?: number;
  max?: number;
  separator?: string;
  inputProps?: React.ComponentProps<typeof Input>;
}

export const RangeInput = ({
  initialValue,
  onChange,
  min,
  max,
  separator = "-",
  inputProps
}: RangeInputProps) => {
  const minRef = useRef<HTMLInputElement>(null);
  const maxRef = useRef<HTMLInputElement>(null);

  const [value, setValue] = useState({
    min: initialValue?.[0],
    max: initialValue?.[1]
  });

  const clamp = (val: number) => Math.max(min ?? -Infinity, Math.min(max ?? Infinity, val));

  const clampMin = (v: number) => {
    if (!v) return undefined;

    if (min === undefined) return v;

    let val = clamp(v);

    if (value.max !== undefined) val = Math.min(val, value.max);

    if (v !== val && minRef.current) minRef.current.value = val.toString();

    return val;
  };

  const clampMax = (v: number) => {
    if (!v) return undefined;

    if (max === undefined) return v;

    let val = clamp(v);

    if (value.min !== undefined) val = Math.max(val, value.min);

    if (v !== val && maxRef.current) maxRef.current.value = val.toString();

    return val;
  };

  const handleOnChange = (e: React.FocusEvent<HTMLInputElement>, type: "min" | "max") => {
    const numValue = Number(e.target.value);

    const newValue = {
      ...value,
      [type]: type === INPUT_TYPE.MIN ? clampMin(numValue) : clampMax(numValue)
    };

    setValue(newValue);
    onChange([newValue.min, newValue.max]);
  };

  useEffect(() => {
    if (value.min !== undefined && minRef.current) minRef.current.value = value.min.toString();
    if (value.max !== undefined && maxRef.current) maxRef.current.value = value.max.toString();
  }, []);

  return (
    <>
      <Input
        ref={minRef}
        onBlur={(e) => handleOnChange(e, INPUT_TYPE.MIN)}
        type="number"
        {...inputProps}
      />
      <span>{separator || "-"}</span>
      <Input
        ref={maxRef}
        onBlur={(e) => handleOnChange(e, INPUT_TYPE.MAX)}
        type="number"
        {...inputProps}
      />
    </>
  );
};
