import { ImageField } from 'react-admin'
import { withStyles } from '@material-ui/core/styles'

const styles = {
  image: {
    height: '50px',
    width: '50px',
    borderRadius: "50%",
  },
}

const MyImageField = withStyles(styles)(ImageField)

export default MyImageField
