import classNames from 'classnames';
import { createContext, ReactNode, useContext } from 'react';

const TabContext = createContext<{ currentTab: string }>({ currentTab: '' });

interface Props {
  value: string;
  onChangeTab: (tab: string) => void;
  tabOptions: SelectOption[];
  sideInfo?: string;
  children?: ReactNode;
}

const TabMenu = ({ tabOptions, value, onChangeTab, sideInfo, children }: Props) => {
  return (
    <TabContext.Provider value={{ currentTab: value }}>
      <div className="tab-menu-wrap">
        <ul className="tab-menus">
          {tabOptions.map((tab) => (
            <li className={classNames('tab-menu', { on: value === tab.value })} data-tab="tabCounsel" key={tab.value}>
              <button type="button" id="_qacodeTab1" className="menu" onClick={() => onChangeTab(tab.value)}>
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
        {sideInfo && <p className="tab-side">{sideInfo}</p>}
      </div>
      {children}
    </TabContext.Provider>
  );
};

interface TabProps {
  value: string;
  children?: ReactNode;
}
const Tab = ({ children, value }: TabProps) => {
  const { currentTab } = useContext(TabContext);

  return (
    <div
      className="counsel-list-wrap"
      data-tab-content="tabCounsel"
      style={{ display: currentTab === value ? 'block' : 'none' }}
    >
      {children}
    </div>
  );
};

TabMenu.Tab = Tab;

export default TabMenu;
