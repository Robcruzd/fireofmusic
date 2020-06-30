import React, { Component } from 'react';
import { Header, ListItem } from '../../components/Index';
import { View, TouchableOpacity, FlatList, Text, Linking } from 'react-native';
import { Content, Icon, Toast } from 'native-base';
import styles from './topTracks.styles';
import api from '../../services/api';
import { COLOR_PRIMARY, COLOR_GRAY } from '../../styles/common';
import SearchBar from 'react-native-searchbar';
import NetInfo from '@react-native-community/netinfo';
import TracksList from '../../lists/tracksList';

class TopTracks extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            tracks: [],
            tracks2: [],
            loadingExtraData: false,
            page:1
        }
    }
    
    componentDidMount(){
        NetInfo.fetch().then((connectionInfo) => {
            if (connectionInfo.type === 'none') {
                this.setState({tracks: TracksList.tracks.track,
                    tracks2: TracksList.tracks.track})
            }else {
                this.getTopTracks();
            }
        });
    }

    getTopTracks = () => {
        api.getTopTracks(this.state.page).then(response => {
            if (response.validate) {
                var tracks = response.data.tracks
                console.log('tracks: ',tracks.track)
                this.setState({tracks: this.state.tracks.concat(tracks.track),
                    tracks2: this.state.tracks2.concat(tracks.track),
                    page: this.state.page + 1,
                    loading: true}
                    );
                console.log('trackas: ',this.state.tracks)
            } else if (this.state.tracks === null) {
                this.setState({focos: response.data, validate: false});
            }
        })
    }

    renderCustomItem = ({ item, index }) => {
        return (
        <ListItem
            onPress={() => Linking.openURL(item.url)}
            uriImage={item.image[1]['#text']}
            text={item.name}
            children={item.listeners}
            arrow={true}
        ></ListItem>
        )
    }

    handleResults = (results) => {
        this.setState({tracks2: results})
    }

    render() {
        return (
            <View style={styles.topTracks}>
                <Header left={'true'} title={'TopTracks'}></Header>
                    <SearchBar
                        showOnLoad
                        backButton={<Icon name="md-search" size={30} color={COLOR_GRAY}/>}
                        data={this.state.tracks}
                        handleResults={this.handleResults}
                        heightAdjust={-16}
                        placeholder='Busca la canción'
                        allDataOnEmptySearch={true}
                    />
                    <FlatList
                            data={this.state.tracks2}
                            renderItem={this.renderCustomItem}
                            style={{ width: '100%', height: '90%'}}
                            keyExtractor = {( item, index ) => index.toString() }
                            ListFooterComponent = { ()=>{
                                return(
                                    <TouchableOpacity style={{paddingTop:20}} onPress={this.getTopTracks}>
                                        <View style={styles.viewText}>   
                                            <Text style={{color:'white', fontSize:16}}>Buscar más resultados</Text>
                                        </View>
                                    </TouchableOpacity>
                                )
                            } }
                        />
            </View>
        );
    }
}

export default TopTracks;