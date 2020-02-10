import Select from 'select-custom'
import classNames from '../../classNames'

const classes = classNames.select

export default () => {
  const selects = [...document.querySelectorAll(`.${classes.el}`)]
  if (!selects.length) return

  selects.forEach(select => {
    const mySelect = new Select(select, {})
    mySelect.init()
  })
}
