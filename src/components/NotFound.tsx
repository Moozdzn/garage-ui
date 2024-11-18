import { Stack, Text } from '@mantine/core'
import { type Icon } from '@tabler/icons-react'

type NotFoundProps = {
	message: string
	Icon: Icon
}

const NotFound: React.FC<NotFoundProps> = ({ message, Icon }) => {
	return (
		<Stack gap={0} justify='center' align='center' h={{ base: 550, xl: 700 }}>
			<Icon size={72} />
			<Text size='xl'>{message}</Text>
		</Stack>
	)
}

export default NotFound
