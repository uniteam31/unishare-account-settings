import webpack from 'webpack';
import packageJson from '../../../package.json';

export const buildModuleFederation = () => {
	return new webpack.container.ModuleFederationPlugin({
		name: 'accountSettings',
		filename: 'remoteEntry.js',
		//
		exposes: {
			'./App': 'app/App.tsx',
			'./Widget': 'widgets/AccountSettingsWidget/index.ts',
		},
		shared: {
			...packageJson.dependencies,
			react: {
				singleton: true,
				requiredVersion: packageJson.dependencies['react'],
			},
			'react-router-dom': {
				singleton: true,
				requiredVersion: packageJson.dependencies['react-router-dom'],
			},
			'react-dom': {
				singleton: true,
				requiredVersion: packageJson.dependencies['react-dom'],
			},
			zustand: {
				singleton: true,
				requiredVersion: packageJson.dependencies['zustand'],
			},
		},
	});
};
