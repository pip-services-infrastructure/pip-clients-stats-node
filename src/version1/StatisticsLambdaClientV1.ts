import { ConfigParams } from 'pip-services-commons-node';
import { IReferences } from 'pip-services-commons-node';
import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { CommandableLambdaClient } from 'pip-services-aws-node';

import { IStatisticsClientV1 } from './IStatisticsClientV1';
import { StatCounterV1 } from './StatCounterV1';
import { StatCounterIncrementV1 } from './StatCounterIncrementV1';
import { StatCounterTypeV1 } from './StatCounterTypeV1';
import { StatCounterValueSetV1 } from './StatCounterValueSetV1';

export class StatisticsLambdaClientV1 extends CommandableLambdaClient implements IStatisticsClientV1 {

    constructor(config?: any) {
        super('statistics');

        if (config != null)
            this.configure(ConfigParams.fromValue(config));
    }

    public getGroups(correlationId: string, paging: PagingParams, 
        callback: (err: any, page: DataPage<string>) => void): void {
        this.callCommand(
            'get_groups',
            correlationId,
            {
                paging: paging
            }, 
            callback
        );
    }
        
    public getCounters(correlationId: string, filter: FilterParams, paging: PagingParams, 
        callback: (err: any, page: DataPage<StatCounterV1>) => void): void {
        this.callCommand(
            'get_counters',
            correlationId,
            {
                filter: filter,
                paging: paging
            }, 
            callback
        );
    }
        
    public incrementCounter(correlationId: string, group: string, name: string,
        value: number, callback?: (err: any) => void): void {
        this.callCommand(
            'increment_counter',
            correlationId,
            {
                group: group,
                name: name,
                time: new Date(),
                value: value
            }, 
            callback
        );
    }

    public incrementCounters(correlationId: string, increments: StatCounterIncrementV1[],
        callback?: (err: any) => void): void {
        this.callCommand(
            'increment_counters',
            correlationId,
            {
                increments: increments
            }, 
            callback
        );
    }

    public readOneCounter(correlationId: string, group: string, name: string, type: StatCounterTypeV1,
        fromTime: Date, toTime: Date, callback: (err: any, value: StatCounterValueSetV1) => void): void {
        this.callCommand(
            'read_one_counter',
            correlationId,
            {
                group: group,
                name: name,
                type: type, 
                from_time: fromTime,
                to_time: toTime
            }, 
            callback
        );
    }

    public readCountersByGroup(correlationId: string, group: string, type: StatCounterTypeV1,
        fromTime: Date, toTime: Date, callback: (err: any, values: StatCounterValueSetV1[]) => void): void {
        this.callCommand(
            'read_counters_by_group',
            correlationId,
            {
                group: group,
                type: type, 
                from_time: fromTime,
                to_time: toTime
            }, 
            callback
        );
    }

    public readCounters(correlationId: string, counters: StatCounterV1[], type: StatCounterTypeV1,
        fromTime: Date, toTime: Date, callback: (err: any, values: StatCounterValueSetV1[]) => void): void {
        this.callCommand(
            'read_counters',
            correlationId,
            {
                counters: counters,
                type: type, 
                from_time: fromTime,
                to_time: toTime
            }, 
            callback
        );
    }
    
}
