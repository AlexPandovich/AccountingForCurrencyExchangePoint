
export const toLocalIsoString = (date:any) => {
	const tzoffset = date.getTimezoneOffset() * 60000; //offset in milliseconds
    const localISOTime = (new Date(date - tzoffset)).toISOString().slice(0, 10);

	return localISOTime;
}

export const today = ()=> {
	return toLocalIsoString(new Date());;
}