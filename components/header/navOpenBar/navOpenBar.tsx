import SearchBar from "../navOpenBar/searchBar";
import HorizonOpenBar from "../navOpenBar/horizonOpenBar";
import VerticalOpenBar from "../navOpenBar/verticalOpenBar";

import navOpenBarStyle from "@styles/components/header/navOpenBar/navOpenBar.module.scss";

export default function NavOpenBar({
  isNavOpen,
  isSearchBar,
  onClickBarClose,
  onClickSearchBarOpen,
}: {
  isNavOpen: boolean;
  isSearchBar: boolean;
  onClickBarClose: any;
  onClickSearchBarOpen: any;
}) {
  return (
    <div className={navOpenBarStyle.nav_open_bar_container}>
      <div className={navOpenBarStyle.open_bar}>
        <div className="site_wrap">
          {isNavOpen && (
            <div>
              <HorizonOpenBar />
              <VerticalOpenBar onClickBarClose={onClickBarClose} />
            </div>
          )}
          {isSearchBar && (
            <SearchBar onClickSearchBarOpen={onClickSearchBarOpen} />
          )}
        </div>
      </div>
      <div className={navOpenBarStyle.backdrop} onClick={onClickBarClose}></div>
    </div>
  );
}
