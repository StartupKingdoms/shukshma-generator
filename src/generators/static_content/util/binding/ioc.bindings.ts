import {IocContainer} from 'shukshma';
import { Container } from 'inversify';

import {REPOSITORY_TYPES} from '../types/repository.types';

// IMPORT ALL INTERFACES HERE
//  @Example:
// import { PlaylistRepository} from '../../domain/playlist/repository/Playlist.repo';

// IMPORT ALL REPO IMPLIMENTATIONS FROM HERE
//  @Example:
// import { MongoPlaylistRepo } from '../../domain/playlist/repository/mongoPlaylist.repo';


let ioc_container:Container = IocContainer.get_ioc_container();
//  @Example:
// ioc_container.bind<PlaylistRepository>(REPOSITORY_TYPES.PlaylistRepository).to(MongoPlaylistRepo);


