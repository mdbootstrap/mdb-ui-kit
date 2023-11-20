import defaultInitSelectors from './initSelectors/pro';
import { InitMDB } from './init';

const initMDBInstance = new InitMDB(defaultInitSelectors);
const initMDB = initMDBInstance.initMDB;

export default initMDB;
