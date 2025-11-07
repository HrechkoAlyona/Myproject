import React from 'react'
import styles from './CustomButton.module.css'

// универсальная кнопка, которую можно переиспользовать везде
const CustomButton = ({ 
  children,       // сам текст внутри кнопки
  onClick,        // обработчик клика
  disabled = false,
  type = 'button',
  className = '',
  fullWidth = false,  // если true → кнопка растянется на 100% по ширине
  ...props
}) => {

  // собираем CSS классы кнопки
  const getButtonClass = () => {
    let classes = [styles.button]  // базовый стиль кнопки
    
    if (fullWidth) { classes.push(styles.fullWidth) }   // ширина 100%

    if (disabled) { classes.push(styles.disabled) }     // серое состояние, нельзя нажать

    if (className) { classes.push(className) }          // доп классы если нужно переопределить стиль

    return classes.join(' ')
  }

  return (
    <button 
      className={getButtonClass()}  // итоговая строка классов
      onClick={onClick}
      disabled={disabled}
      type={type}
      {...props}     // пробрасываем остальные пропсы (например aria-label)
    >
      {children}
    </button>
  )
}

export default CustomButton
