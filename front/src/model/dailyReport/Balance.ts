import BigNumber from "bignumber.js";

export class Balance {
	profit:BigNumber = new BigNumber(0);
	loss:BigNumber = new BigNumber(0);

	getProfit():number {
		return this.profit.toNumber();
	}
	
	getLoss():number {
		return this.loss.toNumber();
	}
}