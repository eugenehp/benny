import { Suite } from 'benchmark';
import { SaveOptions } from './internal/common-types';
declare type Opt = SaveOptions & {
    folder: string;
};
declare type Callback = (content: string, options: Opt) => void;
declare type Save = (options?: SaveOptions, callback?: Callback) => Promise<(suiteObj: Suite) => Suite>;
declare const save: Save;
export { save, Save };
export default save;
