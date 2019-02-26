import React, { Component } from "react";
import { getList } from "./MainFunctions";
import Modal from 'react-responsive-modal';
import axios from "axios";

const modalStyle = {
  modal: {
     padding: "0"
   }
};

class Main extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      body: "",
      image: "",
      posts: [],
      open: false,
      selectedPost: null,
      loading:true
    };

    //bind see CJ

    this.onSubmit = this.onSubmit.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onChange1 = this.onChange1.bind(this);
    this.onChange2 = this.onChange2.bind(this);
    this.onChange3 = this.onChange3.bind(this);
  }

  componentDidMount() {
    this.getAll();
  }

  //onChnage

  onChange1 = event => {
    this.setState({ name: event.target.value});
  };

  onChange2 = event => {
    this.setState({ body: event.target.value});
  };

  onChange3 = event => {
    this.setState({ image: event.target.value});
  };

  //modal
  onOpenModal = i => {
        this.setState({
          open: true,
          selectedPost: i // When a post is clicked, mark it as selected
        });
      };

  onCloseModal = () => {
        this.setState({ open: false });
      };

 //getAll

  getAll = () => {
    getList().then(data => {
      this.setState(
        {
          name: "",
          body: "",
          image: "",
          loading:false,
          posts: [...data] // ...과 "" 이거를 잘 이해해야 한다.  물론 name "" 이거지 처음에는 아무것도 없어야 하니까.
        },
        () => {
          console.log(this.state.posts);
        }
      );
    });
  };

  //onSubmit

  onSubmit(e) {
        e.preventDefault(); //ensure that the default HTML form submit behaviour is prevented

         this.setState({
              loading:true
        });

        const newPost = {
            _title: this.state.name,
            _body: this.state.body,
            _image: this.state.image
        };

        axios.post('https://reactsocialnode.herokuapp.com/api/create', newPost)
             .then(() => {this.getAll();});  //ajax without refresh

        // Reset the Values.
        this.setState({
            name: '',
            body: '',
            image: ''
        })
}

  //onDelete

  onDelete(id) { // javascript _id -> id understand this! any name can be done
      let apiUrl = 'https://reactsocialnode.herokuapp.com/api'
      // Filter all todos except the one to be removed
      let remainder = this.state.posts.filter((post) => { //posts post
        if(post._id !== id) return post;
      });
      // Update state with filter
      axios.delete(apiUrl+'/'+id) //ajax
        .then((res) => {
          this.setState({
            posts: remainder
          });
    })
  }

  //render modal opened
  renderModal = () => {
     // Check to see if there's a selected post. If so, render it.
     if (this.state.selectedPost !== null) {
       const post = this.state.posts[this.state.selectedPost];
       return (
         <div className="modal_p">
           <div className="modal_in_1"><img className="modal_image" src={post._image} alt=""/></div><div className="modal_in_2">
             <p className="modal_in_name">{post._title}</p>
             <p><span>{post._title} </span><span className="modal_in_content">{post._body}</span></p>

             <button
                 href=""
                 className="btn btn-danger"
                 onClick={this.onDelete.bind(this, post._id)}
               >
                 Delete
             </button>

            </div>
         </div>
       );
     }
   }

  //render main content
  render() {
    const { open, loading } = this.state;
    return (
      <div className="wrapper">

        <div className="posting">
         <form onSubmit={this.onSubmit}>
                <label htmlFor="nameInput">Name</label>
                <input type="text" className="in_name" id="nameInput" value={this.state.name || ""} onChange={this.onChange1.bind(this)} required/>

                <label htmlFor="contentInput">Content</label>
                <input
                  type="text"
                  className="in_content"
                  id="contentInput"
                  value={this.state.body || ""}
                  onChange={this.onChange2.bind(this)}
                />

                <label htmlFor="imageInput">Image URL</label>
                <input
                  type="url"
                  className="in_image"
                  id="imageInput"
                  value={this.state.image || ""}
                  onChange={this.onChange3.bind(this)}
                />
            <div className="btn_wrap">
              <button
                disabled={!this.state.name}
                type="submit"
                onClick={this.onSubmit.bind(this)}
                className="submit_button"
              >
                SEND
              </button>
            </div>

            <div><p className="article_num">게시물 {this.state.posts.length}</p></div>

          </form>
        </div>

        {loading ? <div className="image_loading"><img alt="Loading.." src="./loading.gif"/></div> : ''}

        <div className="gallery">
            {this.state.posts.map((post, index) => (
             <div className="gallery-item" key={index}  onClick={() => this.onOpenModal(index)}>
                <p><img className="up_image" src={post._image} alt=""/></p>

                   <div className="gallery-item-info">
             					<ul>
             						<li className="gallery-item-likes"><span className="visually-hidden">Likes: </span><i className="fas fa-heart" aria-hidden="true"></i> 56</li>
             						<li className="gallery-item-comments"><span className="visually-hidden">Comments: </span><i className="fas fa-comment" aria-hidden="true"></i> 2</li>
             					</ul>
             				</div>

              </div>
            ))}
        </div>

        <Modal open={open} onClose={this.onCloseModal} center styles={modalStyle}>
           <div>{this.renderModal()}</div>
        </Modal>

      </div>
    );
  }
}

export default Main;
