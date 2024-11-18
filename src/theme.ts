import { createTheme } from "@mantine/core";

export const theme = createTheme({
	defaultRadius: 'md',
	components: {
		Tooltip: {
			defaultProps: {
				withArrow: true,
				position: 'top',
			},
		},
		Modal: {
			defaultProps: {
				overlayProps: {
					fixed: false,
				},
				portalProps: {
					target: '#ui-container',
				},
				styles: {
					inner: { position: 'absolute' },
					content: { maxHeight: '90%' },
				},
				centered: true,
			},
		}
	},
})