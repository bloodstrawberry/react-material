import React, { useRef, useImperativeHandle, forwardRef } from "react";

const ChildComponent = forwardRef((props, ref) => {
  const inputRef = useRef(null);

  // 외부로 노출할 메서드 설정
  useImperativeHandle(ref, () => ({
    focusInput: () => {
      inputRef.current.focus();
    },
    setValue: (value) => {
      inputRef.current.value = value;
    },
  }));

  return (
    <div>
      <input ref={inputRef} />
    </div>
  );
});

export default ChildComponent;
