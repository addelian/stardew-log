export type TimerType = {
    id: string,
    name: string,
    countdown: number,
    timerType: string,
    season: string[],
    type?: string,
    product?: string,
    firstTime?: boolean,
    repeats?: boolean,
    repeatLength?: number,
    timerFor?: string,
    time?: number
    kegDuration?: number,
    growTime?: number
};

export type ShowStateType = {
    date: boolean,
    artisanTimers: boolean,
    currentTimers: boolean,
    harvestTimers: boolean,
    fixtureTimers: boolean,
    journal: boolean,
    customTimers: boolean,
};

export type ErrorType = {
    exists: boolean,
    message: string,
    description: string,
    triggers: TimerType[] | [],
};

export type CropType = {
    id: string,
    name: string,
    type: string,
    season: string[],
    growTime?: number,
    repeats?: boolean,
    kegProduct?: string,
    jarProduct?: string,
    kegDuration?: number,
    repeatLength?: number,
    preferred?: string,
    time?: number,
    product?: string
};

export type FixtureType = {
    id: string,
    name: string,
    product: string,
    time: number,
    season: string[],
    preferred?: string,
    repeats?: boolean,
    growTime?: number,
    kegProduct?: string,
    kegDuration?: number,
    jarProduct?: string
};