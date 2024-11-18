import { forwardRef } from 'react'
import { ActionIcon, type ActionIconProps, Badge, type BadgeProps, Button, type ButtonProps, useMantineColorScheme } from "@mantine/core";

// unsure if this is the best way to do this to dinamically change the variant based on the color scheme

const useComponentVariant = () => {
    const { colorScheme } = useMantineColorScheme()

    return colorScheme === 'dark' ? 'light' : 'filled'
}

export const ButtonWrapper = forwardRef<HTMLButtonElement, ButtonProps & React.ComponentPropsWithoutRef<'button'>>((props, ref) => {
	const variant = useComponentVariant()

	const { children, ...rest } = props

	return (
		<Button ref={ref} {...rest} variant={variant}>
			{children}
		</Button>
	)
})

export const BadgeWrapper: React.FC<BadgeProps> = (props) => {
    const variant = useComponentVariant()

    const {children, ...rest} = props

    return <Badge {...rest} variant={variant}>{props.children}</Badge>
}

export const ActionIconWrapper = forwardRef<HTMLButtonElement, ActionIconProps & React.ComponentPropsWithoutRef<'button'>>((props, ref) => {
	const variant = useComponentVariant()

	const { children, ...rest } = props

	return (
		<ActionIcon ref={ref} {...rest} variant={variant}>
			{children}
		</ActionIcon>
	)
})