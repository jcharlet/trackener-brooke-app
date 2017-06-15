import { Client, Configuration} from "bugsnag-react-native";

var bugsnag;

export const initBugsnag = () => {
    var configuration = new Configuration();
    configuration.apiKey = "3ca64084491704d2c480c102a315ceb9";
    bugsnag=  new Client(configuration);
}

export const setUser = (username: string) => {
    bugsnag.setUser("", username, "");
};

export const logBreadcrumb = (name:string,metadata:JSON) => {
    bugsnag.leaveBreadcrumb(name,metadata);
}

