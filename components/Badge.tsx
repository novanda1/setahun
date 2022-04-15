import { Badge as Bdg } from "@roketid/windmill-react-ui";
import { BadgeProps } from "@roketid/windmill-react-ui/dist/Badge";

const Badge: React.FC<any> = ({ type, children, className, ...props }) => {
  let cls = ''
  let mtype = type
  if (type == "cprimary") {
    cls += 'text-blue-700 bg-blue-100 dark:bg-blue-700 dark:text-blue-10'
    mtype = 'neutral'
  }


  return (
    <Bdg
      {...props}
      type={mtype}
      className={cls}
    >
      {children}
    </Bdg>
  )
}

export default Badge