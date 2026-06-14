import BigNumber from "bignumber.js";

export class CurrencyOperations {
	currency: string = "";

	startDayNominal:BigNumber = new BigNumber(0);
	startDayMdl:BigNumber = new BigNumber(0);;

	buyNominal: BigNumber = new BigNumber(0);;
	buyMdl:BigNumber = new BigNumber(0);;

	sellNominal: BigNumber = new BigNumber(0);;
	sellMdl: BigNumber = new BigNumber(0);;
	
	endDayNominal: BigNumber = new BigNumber(0);;
	endDayMdl: BigNumber = new BigNumber(0);

	getCurrencyName():string {return this.currency;}
	getStartDayNominal():number {return this.startDayNominal.toNumber();}
	getStartDayMdl():number {return this.startDayMdl.toNumber();}

	getBuyNominal():number {return this.buyNominal.toNumber();}
	getBuyMdl():number {return this.buyMdl.toNumber();}

	getSellNominal():number {return this.sellNominal.toNumber();}
	getSellMdl():number {return this.sellMdl.toNumber();}

	getEndDayNominal():number {return this.endDayNominal.toNumber();}
	getEndDayMdl():number {return this.endDayMdl.toNumber();}

}