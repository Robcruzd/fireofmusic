import React, { Component } from 'react';
import { Header, ListItem } from '../../components/Index';
import { View, TouchableOpacity, FlatList, Text, Linking } from 'react-native';
import { Icon } from 'native-base';
import styles from './topArtists.styles';
import api from '../../services/api';
import { COLOR_PRIMARY, COLOR_GRAY } from '../../styles/common';
import SearchBar from 'react-native-searchbar';
import ArtistsList from '../../lists/artistsList';
import NetInfo from '@react-native-community/netinfo';

class TopArtists extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            artists: [],
            artists2: [],
            loadingExtraData: false,
            page:1
        }
    }
    
    componentDidMount(){
        NetInfo.fetch().then((connectionInfo) => {
            if (connectionInfo.type === 'none') {
                this.setState({artists: ArtistsList.topartists.artist,
                    artists2: ArtistsList.topartists.artist})
            }else {
                this.getTopArtists();
            }
        });
    }

    getTopArtists = () => {
        api.getTopArtists(this.state.page).then(response => {
            if (response.validate) {
                var artists = response.data.topartists
                console.log('artists: ',artists.artist)
                this.setState({artists: this.state.artists.concat(artists.artist),
                    artists2: this.state.artists2.concat(artists.artist),
                    page: this.state.page + 1,
                    loading: true}
                    );
                console.log('artistas: ',this.state.artists)
            } else if (this.state.artists === null) {
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
        this.setState({artists2: results})
    }

    render() {
        return (
            <View style={styles.topArtists}>
                <Header left={'true'} title={'TopArtists'}></Header>
                    <SearchBar
                        showOnLoad
                        backButton={<Icon name="md-search" size={30} color={COLOR_GRAY}/>}
                        data={this.state.artists}
                        handleResults={this.handleResults}
                        heightAdjust={-16}
                        placeholder='Busca el Artista'
                        allDataOnEmptySearch={true}
                    />
                    <FlatList
                            data={this.state.artists2}
                            renderItem={this.renderCustomItem}
                            style={{ width: '100%', height: '90%'}}
                            keyExtractor = {( item, index ) => index.toString() }
                            ListFooterComponent = { ()=>{
                                return(
                                    <TouchableOpacity style={{paddingTop:20}} onPress={this.getTopArtists}>
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

export default TopArtists;