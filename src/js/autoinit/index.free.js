import defaultInitSelectors from './initSelectors/free';
import { InitMDB } from './init';

const initMDBInstance = new InitMDB(defaultInitSelectors);
const initMDB = initMDBInstance.initMDB;

export default initMDB;
