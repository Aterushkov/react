import React,{ Component} from 'react'; 

import AppHeader from '../app-header/';
import Searhpanel from '../search-panel';
import PostStatusFilter from '../post-status-filter'; 
import PostList from '../post-list'; 
import PostAddForm from '../post-add-form'; 
import './app.css';


export default class App extends Component{
		constructor(props) {
			super(props);
			this.state = {
				data : [
					{label: 'Ешь', important: true,leke:false, id:4},
					{label: 'Ешькина кошь!', important: true,leke:false, id:1},
					{label: 'Кошкин ешь!', important: false, leke:false, id:2},
					{label: 'Кошь', important: false,leke:false, id:3}
				],
				term: '',
				filter: 'all'
			}
			this.deliteitem =this.deliteitem.bind(this);
			this.addItem =this.addItem.bind(this); 
			this.onToggleImportant =this.onToggleImportant.bind(this); 
			this.onToggleLiked =this.onToggleLiked.bind(this); 
			this.onUpdateSearch =this.onUpdateSearch.bind(this);
			this.onFilterSelect =this.onFilterSelect.bind(this);
			this.maxId = 5;
		}
	deliteitem (id){
		this.setState(({data}) =>{
			const index = data.findIndex(elem => elem.id === id);

			const before = data.slice(0, index);
			const after = data.slice(index + 1);

			const newArr = [...before, ...after];
			return{
				data: newArr
			}
		});
	}
	addItem(body){
		const newItem ={
			label: body,
			important: false, 
			id:this.maxId++
		}
		this.setState(({data}) => {
			const newArr = [...data, newItem];
			return {
				data: newArr
			}

		})
		
	}
	onToggleImportant (id){
		this.setState(({data}) => {
			const index = data.findIndex(elem => elem.id === id);

			const old = data[index];
			const newItem = {...old,important:!old.important}
			const before = data.slice(0, index);
			const after = data.slice(index + 1);

			const newArr = [...before,newItem,...after];
			return{
				data: newArr
			}
	})
	}

	onToggleLiked (id){
		this.setState(({data}) => {
				const index = data.findIndex(elem => elem.id === id);

				const old = data[index];
				const newItem = {...old,like:!old.like}
				const before = data.slice(0, index);
				const after = data.slice(index + 1);

				const newArr = [...before,newItem,...after];
				return{
					data: newArr
				}
		})
	}
	searcPost(items, term){
			if(term.length === 0){
				return items;
			} else {
				return items.filter((item) =>{
					return item.label.indexOf(term) > -1
				})
			}
	}
	filterPost(items, filter){
		if(filter === 'like'){
			return items.filter(item => item.like);
		} else{
			return items;
		}

	}
	onUpdateSearch(term){
		this.setState({term})
	}

	onFilterSelect(filter){
		this.setState({filter})
	}
	render (){
		const {data, term, filter} = this.state;
		const liked = data.filter(item => item.like).length;
		const allPosts = data.length;

		const  visiblePosts = this.filterPost(this.searcPost(data, term), filter);
		return (
			<div className='app'>
						<AppHeader
						liked={liked}
						allPosts={allPosts}
						/>
						<div className='search-panel d-flex'>
							<Searhpanel
							onUpdateSearch={this.onUpdateSearch}/>
							<PostStatusFilter
							filter={filter}
							onFilterSelect={this.onFilterSelect}
							/>
							
						</div>
						<PostList posts={visiblePosts}
						onDelite={this.deliteitem}
						onToggleImportant={this.onToggleImportant}
						onToggleLiked={this.onToggleLiked}/>
						<PostAddForm
						onAdd={this.addItem}
						
						/>
			</div>
		
				)
	}
};




