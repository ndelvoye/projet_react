import {render} from '@testing-library/react';
import App from './App';
import mockData from "./mocks/backendMock.json";
import {configure, shallow} from "enzyme";
import VideoPlayer from "./components/VideoPlayer/VideoPlayer";
import Adapter from 'enzyme-adapter-react-16';
import ChatBox from "./components/ChatBox/ChatBox";
import Map from "./components/Map/Map";

configure({adapter: new Adapter()});

beforeAll(() => {
    jest.spyOn(window, 'fetch')
})

afterAll(() => {
    fetch.mockClear();
});

test("backend is called", () => {
    window.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => {
            return Promise.resolve({
                status: 200,
                json: () => {
                    return Promise.resolve(mockData);
                }
            });
        }
    })
    render(<App/>);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('https://imr3-react.herokuapp.com/backend');
});

describe('Header', () => {
    it("contains div with className header", () => {
        window.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => {
                return Promise.resolve({
                    status: 200,
                    json: () => {
                        return Promise.resolve(mockData);
                    }
                });
            }
        })
        const {container} = render(<App/>);
        const headerDiv = container.querySelector(`[class="header"]`)
        expect(headerDiv).toBeInTheDocument();
    });
    describe('img', () => {
        const {container} = render(<App/>);
        const headerDiv = container.querySelector(`[class="header"]`)
        const img = headerDiv.getElementsByTagName('img');
        it("1 and only 1 img", () => {
            expect(img.length === 1).toBeTruthy();
        });
        it("has id logo", () => {
            expect(img[0].id).toBe('logo');
        });
        it("has alt Logo IMRStreaming", () => {
            expect(img[0].alt).toBe('Logo IMRStreaming');
        });
        it("has src 'img/logo.png'", () => {
            const uriRegEx = /^.*\/img\/logo.png$/;
            expect(img[0].src).toMatch(uriRegEx);
        });
    });
    it("contains div with headerText id", () => {
        window.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => {
                return Promise.resolve({
                    status: 200,
                    json: () => {
                        return Promise.resolve(mockData);
                    }
                });
            }
        })
        const {container} = render(<App/>);
        const headerTextDiv = container.querySelector(`[id="headerText"]`)
        expect(headerTextDiv).toBeInTheDocument();
    });
    it("text contained in headerText div is 'Votre nouvelle plateforme de streaming'", () => {
        window.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => {
                return Promise.resolve({
                    status: 200,
                    json: () => {
                        return Promise.resolve(mockData);
                    }
                });
            }
        })
        const {container} = render(<App/>);
        const headerDiv = container.querySelector(`[id="headerText"]`)
        expect(headerDiv.textContent).toEqual('Votre nouvelle plateforme de streaming');
    });
});

describe('Components are presents', () => {
    it("contains VideoPlayer", () => {
        window.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => {
                return Promise.resolve({
                    status: 200,
                    json: () => {
                        return Promise.resolve(mockData);
                    }
                });
            }
        });

        const wrapper = shallow(<App/>);
        expect(wrapper.containsMatchingElement(<VideoPlayer/>)).toEqual(true);
    });
    it("contains Map", () => {
        window.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => {
                return Promise.resolve({
                    status: 200,
                    json: () => {
                        return Promise.resolve(mockData);
                    }
                });
            }
        });

        const wrapper = shallow(<App/>);
        expect(wrapper.containsMatchingElement(<Map/>)).toEqual(true);
    });
    it("contains ChatBox", () => {
        window.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => {
                return Promise.resolve({
                    status: 200,
                    json: () => {
                        return Promise.resolve(mockData);
                    }
                });
            }
        });

        const wrapper = shallow(<App/>);
        expect(wrapper.containsMatchingElement(<ChatBox/>)).toEqual(true);
    });
});
