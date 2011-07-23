
var UnitTest = {
    
    index: 0,
    
    passes: 0,
    
    run: function(test_runner) {
        
        this.$=$("<div></div>").appendTo('body').attr({
            id: 'tests'
        });
        
        //try {
            test_runner();
        //} catch (e) {
        //    this.index ++;
        //    throw (e);
        //} finally {
        //    return this.done();
        //}
        return this.done();
        
    },
    
    done: function(){
        var status = this.passes === this.index ? 'pass' : 'fail';
        this.message(this.passes+"/"+this.index+" tests passed.").addClass(
            status
        );
        return this;
    },
    
    test_message: function(message) {
        this.index++;
        return this.message(this.index+' - '+message);
    },
    
    message: function(message) {
        
        return $('<p>' + message + '</p>').appendTo(this.$);
        
    },
    
    fail: function(msg) {
        
        this.test_message('failed: '+(msg || 'unspecified')).addClass('fail');
        
    },
    
    pass: function(msg) {
        this.passes ++;
        this.test_message('passed: '+(msg || '')).addClass('pass');
        
    },
    
    assert: function(val, message) {
        
        val ? this.pass(message) : this.fail(message);
        
    },
    
    assertEqual: function(val, expected, message) {
        
        this.assert(val === expected, message + ', expected: '+expected+' got: '+val);
        
    }

};