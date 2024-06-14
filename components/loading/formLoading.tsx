import { Oval, OvalProps } from "react-loader-spinner";

interface formLoadingProps extends OvalProps {
  className?: string;
}

export default function FormLoading({ className, ...props }: formLoadingProps) {
  return (
    <button className={className} type="button" disabled>
      <Oval
        visible={true}
        color="#1381e1"
        secondaryColor="#1381e1"
        {...props}
      />
    </button>
  );
}
