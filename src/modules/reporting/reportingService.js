import { Client, Configuration} from "bugsnag-react-native";

var bugsnag;

export const initBugsnag = (apiKey: string) => {
    var configuration = new Configuration();
    configuration.apiKey = apiKey;
    bugsnag=  new Client(configuration);
}

export const setUser = (username: string) => {
    bugsnag.setUser("", username, "");
};

export const logBreadcrumb = (name:string,metadata:JSON) => {
    bugsnag.leaveBreadcrumb(name,metadata);
}

