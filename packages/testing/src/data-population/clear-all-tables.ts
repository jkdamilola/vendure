import { VendureConfig } from '@vendure/core';
import { preBootstrapConfig } from '@vendure/core/dist/bootstrap';
import { createConnection } from 'typeorm';

// tslint:disable:no-console
// tslint:disable:no-floating-promises
/**
 * Clears all tables in the detabase sepcified by the connectionOptions
 */
export async function clearAllTables(config: VendureConfig, logging = true) {
    config = await preBootstrapConfig(config);
    const entityIdStrategy = config.entityIdStrategy;
    const connection = await createConnection({ ...config.dbConnectionOptions });
    if (logging) {
        console.log('Clearing all tables...');
    }
    try {
        await connection.synchronize(true);
    } catch (err) {
        console.error('Error occurred when attempting to clear tables!');
        console.error(err);
    } finally {
        await connection.close();
    }
    if (logging) {
        console.log('Done!');
    }
}
