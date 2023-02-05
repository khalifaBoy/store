import { Component } from '@angular/core';

@Component({
  selector: 'app-loader',
  template: 
  `
  <style>
  .loader {
    height: 100px;
    width: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    animation: spin 3s infinite linear;
    margin: 0 auto;
    margin-top: 10vh;
  }

  .red {
    background: #f65314;
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }

  .yellow {
    background: #ffbb00;
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }


  @keyframes spin {
    0% {
        transform: rotate(0deg);
        width: 100px;
    }
    50% {
        transform: rotate(360deg);
        width: 68px;
    }
    100% {
        transform: rotate(720deg);
        width: 100px;
    }
  }
  </style>
  <div class="loader">
  <div class="red"></div> <div class="yellow"></div>
  </div>
  `
})
export class LoaderComponent {

}
