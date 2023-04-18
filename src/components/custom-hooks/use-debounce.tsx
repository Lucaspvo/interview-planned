import React from 'react';
import * as _ from 'lodash';

function useDebounce(initialValue: string, time: number) {
	const [debouncedValue, setDebouncedValue] = React.useState<string>(initialValue);

	React.useEffect(() => {
		const debouncedFunction = _.debounce(() => {
			setDebouncedValue(initialValue);
		}, time);

		debouncedFunction();

		return () => debouncedFunction.cancel();
	}, [initialValue, time]);

	return debouncedValue;
}

export default useDebounce;