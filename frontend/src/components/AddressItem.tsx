import React from 'react';

interface AddressItemProps {
	line1?: string;
	city?: string;
}

function AddressItem(props: AddressItemProps) {

	return (
		<div className="row">
			- {props.line1}, {props.city}
		</div>
	)

}

export default AddressItem;