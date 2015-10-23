(function(){

  function releaseContainer(box){
    if (box.xtag.container) {
      box.xtag.container.removeAttribute('x-peekbox-container');
      box.xtag.container = null;
    }
  }

  xtag.register('x-peekbox', {
    lifecycle: {
      inserted: function(){
        releaseContainer(this);
        if (this.parentNode) {
          (this.xtag.container = this.parentNode).setAttribute('x-peekbox-container', '');
        }
      },
      removed: function(){
        releaseContainer(this);
      }
    },
    events: {
      transitionend: function(e){
        if (e.target == this){
          xtag.fireEvent(this, this.hasAttribute('x-peekbox-show') ? 'show' : 'hide');
        }
      }
    },
    accessors: {
      edge: {
        attribute: {},
        set: function(){
          xtag.skipTransition(this);
        }
      }
    },
    methods: {
      show: function(){
        this.setAttribute('x-peekbox-show', '');
      },
      hide: function(){
        this.removeAttribute('x-peekbox-show');
      },
      toggle: function(){
        this.hasAttribute('x-peekbox-show') ? this.hide() : this.show();
      }
    }
  });

})();
