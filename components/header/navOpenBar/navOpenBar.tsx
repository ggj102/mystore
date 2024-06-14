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
  onClickBarClose: () => void;
  onClickSearchBarOpen: () => void;
}) {
  return (
    <div className={navOpenBarStyle.nav_open_bar_container}>
      {isNavOpen && (
        <div className={navOpenBarStyle.open_bar}>
          <div className="site_wrap">
            <HorizonOpenBar />
            <VerticalOpenBar onClickBarClose={onClickBarClose} />
          </div>
        </div>
      )}
      {isSearchBar && <SearchBar onClickSearchBarOpen={onClickSearchBarOpen} />}
      <div
        className={`${navOpenBarStyle.backdrop} ${
          isNavOpen && navOpenBarStyle.vertical_backdrop
        }`}
        onClick={onClickBarClose}
      ></div>
    </div>
  );
}
