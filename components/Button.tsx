import { Button as Btn } from "@roketid/windmill-react-ui";
import { ButtonAsButtonProps } from "@roketid/windmill-react-ui/dist/Button";

const Button: React.FC<ButtonAsButtonProps> = ({ layout, children, className, ...props }) => {
  return (
    <Btn layout={layout} className={`${!layout || layout == "primary" ? "bg-blue-600  active:bg-blue-600 hover:bg-blue-700  focus:ring-blue-300 " : ""} ${className}`} {...props}>
      {children}
    </Btn>
  )
}

export default Button