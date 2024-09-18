import { CgSpinnerAlt } from "react-icons/cg";
import { IconBaseProps } from "react-icons/lib";

export default function Loading(props: IconBaseProps) {
  return <CgSpinnerAlt size={36} className="animate-spin flex-1" {...props} />;
}
