import classNames from 'classnames';
import { memo } from 'react';
import s from './Field.module.scss';

type Props = {
	label: string;
	value?: string | number;
	disabled?: boolean;
	onClick?: () => void;
	//
	className?: string;
};

export const Field = memo((props: Props) => {
	const { label, value, disabled, onClick, className } = props;

	return (
		<div className={classNames(s.Field, className, disabled && s.disabled)} onClick={onClick}>
			<div className={s.label}>{label}</div>

			<div className={s.fieldValue}>{value}</div>
		</div>
	);
});
