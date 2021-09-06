import { Component } from '@angular/core';
import { IHeaderAngularComp } from 'ag-grid-angular';
import { IHeaderParams } from 'ag-grid-community';
import { DownloadPlaylistsHeaderService } from './download-playlists-header.service';
import { Category } from '../../../shared/model/category';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-download-playlists-header',
  templateUrl: './download-playlists-header.component.html',
  styleUrls: ['./download-playlists-header.component.scss'],
})
export class DownloadPlaylistsHeaderComponent implements IHeaderAngularComp {
  params: GridButtonParams;
  categories: Category[] = [];

  constructor(private dPH: DownloadPlaylistsHeaderService) {}

  agInit(params: GridButtonParams): void {
    this.params = params;
  }

  refresh(params: any): boolean {
    return false;
  }

  onButtonClicked(): void {
    if (this.categories.length === 0) {
      this.dPH.getAllCategories().subscribe((c) => {
        this.categories = c;
        this.categories.splice(0, 0, createFakeCategory('overall', 'Overall'));
        this.categories.splice(0, 0, createFakeCategory('all', 'All Ranked Maps'));
      });
    }
  }

  downloadPlaylist(categoryName: string): void {
    window.open(`${environment.apiUrl}/playlists/${categoryName}`, '_blank');
  }
}

function createFakeCategory(name: string, displayName: string): Category {
  return {
    categoryName: name,
    categoryDisplayName: displayName,
    countsTowardsOverall: true,
    description: '',
  };
}

interface GridButtonParams extends IHeaderParams {
  buttonInfo: ButtonInfo;
}

interface ButtonInfo {
  icon: string;
  clickCallback: (key: any) => void;
  color: string;
  link: string;
  tooltip: string;
}
