<template>
      <div class="content-wrapper">

           
            <section class="content" style="min-height:85vh">
                
                <div class="container"  v-if="!result" >
                <div class="row">
                    <div class="col-xs-8">
                    <h3>Progress:</h3>
                    <div class="btn-toolbar">
                       
                        <button class="btn btn-sm" 
                         v-for="(question, index) in dataquestions"
                         v-bind:class="{ 'btn-info': question.selected.length > 0 , 'btn-danger': question.selected.length === 0 }"
                         v-on:click="setActiveQuestion(index)" > {{ index + 1 }} </button> 
                    </div>
                </div>
                <div class="col-xs-4">
                    <div class="row">
                        <h3>Legend:</h3>
                        <div class="col-sm-4">
                            <button class="btn btn-info btn-sm">
                            
                            </button>
                            <p>Answered</p>
                        </div>
                        <div class="col-sm-4">
                            <button class="btn btn-danger btn-sm">
                            
                            </button>
                            <p>Unanswered</p>
                        </div>
                    </div>
                </div>
                </div>
                 <div class=" text-center"  v-if="dataquestions.length == 0">

                    <i class="fa fa-spinner fa-spin" style="font-size:24px"></i> Proccessing...please wait.
                  </div>

                 <div class="row"  v-if="dataquestions.length > 0" >
                     <div class="alert alert-danger text-center"
                            v-if="quizError">
                              <i class="glyphicon glyphicon-warning-sign"style="font-size:24px" ></i>   You have not answered all of the questions!
                            <button class="close" v-on:click="quizError = false">&times</button>
                     </div>
                    <h3>Question:</h3>
                        <div class="well well-sm"  v-if="!finalize">
                            <div class="row">
                                <div class="col-xs-12">
                                    <h4>{{activeQuestions+1 +'. '+dataquestions[activeQuestions].text }}</h4>


                            <div class="row"
                                v-if="dataquestions[activeQuestions].type === 'text'">
                                <div class="col-sm-6" v-for="(answer, index) in dataquestions[activeQuestions].possibilities">
                                    <h4 class="answer" v-on:click="selectAnswer(index+1)"  >
                                       <input type="radio" name="answer" v-bind:value="index+1 " v-bind:id="index+1" v-on:click="selectAnswer(index+1)"  v-bind:checked="index+1 == dataquestions[activeQuestions].selected[0] " disabled  >  {{answer.answer}}
                                    </h4>
                                </div>
                            </div>

                             <div class="row"
                                v-if="dataquestions[activeQuestions].type === 'multiple'">
                                <div class="col-md-12"><small><i>More than one Answer</i></small></div>
                                <div class="col-sm-6" v-for="(answer, index) in dataquestions[activeQuestions].possibilities">
                                    <h4 class="answer"  v-on:click="selectAnswer(index+1)" >
                                       <input type="checkbox" name="answer" v-bind:value="index+1" disabled v-bind:id="index+1"    v-bind:checked="dataquestions[activeQuestions].selected.includes(index+1) " >  {{answer.answer}}
                                    </h4>
                                </div>
                            </div>

                            <div>

                            </div>

                            
                                </div>
                            </div>
                              <button class="btn btn-warning" v-on:click="questionAnswered()">Continue</button>
                        </div>

                        <div class="well well-sm" v-if="finalize">
                            <div class="row">
                                <div class="col-xs-12">
                                    <h3>Are you sure you want to submit your answers?</h3>
                                    <button class="btn btn-info btn-sm" v-on:click="finalizeAnswers()">Yes</button>
                                    <button class="btn btn-danger btn-sm" v-on:click="finalize = false">No</button>
                                </div>
                            </div>
                        </div>
                 </div>







                </div>

                <div class="container" v-if="result" >

                     <div class="row">
               <div class="col-xs-8">
                   <h3>Results:</h3>
                   <div class="btn-toolbar">
                       <button class="btn btn-sm"
                          v-for="(question, index) in dataquestions"
                           v-bind:class="{'btn-success': question.correct, 'btn-danger': !question.correct}"
                           v-on:click="setActiveQuestion(index)">
                            {{index+1}}
                       </button>
                   </div>
               </div>
               <div class="col-xs-4">
                   <div class="row">
                       <h3>Legend:</h3>
                       <div class="col-sm-4">
                           <button class="btn btn-sm btn-success">
                               <span class="glyphicon glyphicon-ok"></span>
                           </button>
                           <p>Correct</p>
                       </div>
                       <div class="col-sm-4">
                           <button class="btn btn-danger btn-sm">
                               <span class="glyphicon glyphicon-remove"></span>
                           </button>
                           <p>Incorrect</p>
                       </div>
                   </div>
               </div>
           </div><!-- row -->

            <!-- <div class="row">
               <div class="col-xs-12 top-buffer">
               		
                    <h2>You Scored {{results.quizMetrics.numCorrect}} / {{results.dataService.quizQuestions.length}}</h2>
                   
                    <h2><strong>{{results.calculatePerc() | number:2}}%</strong></h2>
               </div>
           </div> -->



           <div class="row">
               <h3>Questions:</h3>
               <div class="well well-sm">
                   <div class="row">
                       <div class="col-xs-12">
		                   
                            <h4>{{activeQuestions+1 +'. '+dataquestions[activeQuestions].text }}</h4>
                           <div class="row"
                               v-if="dataquestions[activeQuestions].type === 'text'">
                               
                               <div class="col-sm-6" v-for="(answer, index) in dataquestions[activeQuestions].possibilities">
                                   <h4 class="answer"
                                      >
                                       {{answer.answer}}
                                       
                                       <small class="pull-right text-danger"
                                            v-show="!inArray(index+1) && inSarray(index+1) "> <i>Your Answer</i> </small>
                                       <small class="pull-right text-success "
                                            v-show="inArray(index+1) "> <i>Correct Answer</i> </small>
                                   </h4>
                               </div>
                           </div><!-- row -->

						
                          <div class="row"
                               v-if="dataquestions[activeQuestions].type === 'multiple'">
                               
                               <div class="col-sm-6" v-for="(answer, index) in dataquestions[activeQuestions].possibilities">
                                   <h4 class="answer"
                                      >
                                       {{answer.answer}}
                                       
                                       <small class="pull-right text-danger "
                                            v-show="!inArray(index+1) && inSarray(index+1) "><i>Your Answer</i>  </small>
                                       <small class="pull-right text-success"
                                            v-show="inArray(index+1) "><i>Correct Answer</i></small>
                                   </h4>
                               </div>
                           </div>


                       </div>
                   </div>
               </div><!-- well -->
				<!-- ng-click calling the reset method on the controller -->
               <!-- <button class="btn btn-primary btn-lg" ng-click="results.reset()">Go Back To Facts</button> -->
           </div>



                </div>
            </section> 
      </div>
      
</template>

<script>
import services from "../../services";
export default {

data() {
    return {
      dataquestions: [],
      activeQuestions: 0,
      numQuestionsAnswered:0,
      quizError:false,
      finalize:false,
      result:false,
      numCorrectAnswer:0,
      
    };
  },
   created(){  
    //   [1,2] =['1','2'];
       try {
           if (services.getquizQuestionsCached()) {
        //    alert('ok');
           this.dataquestions = services.getquizQuestionsCached();
       }else{

           services.getquizQuestions()
           .then(response => {
                this.handleSuccess(response);
               // console.log(response);
               })
            .catch(error => {
               //  this.handleError(error);
               console.log(error);
              });
        
       }

       if (services.getquiznumQuestionsAnsweredCached()) {

           this.numQuestionsAnswered = parseInt(services.getquiznumQuestionsAnsweredCached());
        //    console.log('ca', typeof this.numQuestionsAnswered );
           
       }
       if (services.getquizactiveQuestionsCached()) {

           this.activeQuestions = parseInt(services.getquizactiveQuestionsCached());
        //    console.log('ca', typeof this.numQuestionsAnswered );
           
       }
       if (services.getresultCached()) {

           this.result = JSON.parse(services.getresultCached());
        //    console.log('ca', this.finalize);
           
       }
       if (services.getfinalizeCached()) {

           this.finalize = JSON.parse(services.getfinalizeCached());
        //    console.log('ca', this.finalize);
           
       }
           
       } catch (error) {

            services.getquizQuestions()
           .then(response => {
                this.handleSuccess(response);
               // console.log(response);
               })
            .catch(error => {
               //  this.handleError(error);
               console.log(error);
              });
           
       }
       
  },

    methods:{
    handleSuccess(response) {
      
      this.dataquestions= response.body.data;

      services.setquizQuestionsCached(this.dataquestions);
    
     
    
    },
    questionAnswered(){
        // alert('ok');
        let quizLength = this.dataquestions.length;
        if(this.dataquestions[this.activeQuestions].selected.length !== 0 ) {
            this.numQuestionsAnswered++;
             if(this.numQuestionsAnswered >= quizLength){
                //  alert('here');
                for (let i = 0; i < quizLength.length; i++) {
                    if (this.dataquestions[i].selected.length == 0) {
                        this.setActiveQuestion(i);
                        return;
                    }
                        
                }
                // alert('here');
                this.quizError=false;
                this.finalize=true;
                return;
             }


        }

        this.setActiveQuestion();

    },
    setActiveQuestion(index){
        if (index === undefined) {
            
            let breakOut= false;
            let quizLength = this.dataquestions.length - 1;
            while(!breakOut){
                        
                this.activeQuestions = this.activeQuestions < quizLength?++this.activeQuestions:0;
                if(this.activeQuestions === 0){
                    this.quizError=true;
                }

                if(this.dataquestions[this.activeQuestions].selected.length === 0){
                            breakOut = true;
                }
            }
        }else{
            this.activeQuestions= index;
        }

    },

    selectAnswer(index){
        if (this.dataquestions[this.activeQuestions].type==='multiple' ) {
           
        if($(`#${index}`).is(':checked')) {
            //  alert('ok');
              $(`#${index}`).prop("checked", false);
            //   arr.splice(arr.indexOf('3'),1)
              this.dataquestions[this.activeQuestions].selected.splice(this.dataquestions[this.activeQuestions].selected.indexOf(index),1);
              console.log(this.dataquestions[this.activeQuestions].selected);

        } else {
             $(`#${index}`).prop("checked", true);
            //   this.dataquestions[this.activeQuestions].selected=index;
            
                   this.dataquestions[this.activeQuestions].selected.push(index);
                   console.log(this.dataquestions[this.activeQuestions].selected);
                  

        }
            
        }else{

            $(`#${index}`).prop("checked", true);
            this.dataquestions[this.activeQuestions].selected[0]=index;
            console.log(this.dataquestions[this.activeQuestions].selected);

        }
   
    },
    finalizeAnswers(){
        this.finalize = false;
        this.numQuestionsAnswered = 0;
        this.activeQuestions = 0;
        this.markQuiz();
        this.result=true;




    },
    arraysEqual(a, b) {
             a.sort();
             b.sort();

          if (a.toString() == b.toString()) {
              return true;
          }
          return false;
    },
    markQuiz(){
        for (var i = 0; i < this.dataquestions.length; ++i) {
            // console.log('s',this.dataquestions[i].selected);
            // console.log('c',this.dataquestions[i].answer);

            if(this.arraysEqual(this.dataquestions[i].selected, this.dataquestions[i].answer)){
                  this.dataquestions[i].correct=true; 
                  this.numCorrectAnswer++;
                //    console.log(this.numCorrectAnswer);

            }else{
                this.dataquestions[i].correct=false; 
            }
        }
        // console.log(this.numCorrectAnswer);
    },
    inArray(index){
        return this.dataquestions[this.activeQuestions].answer.includes(index);
        // console.log(this.dataquestions[this.activeQuestions].correct);
    },
    inSarray(index) {
         return this.dataquestions[this.activeQuestions].selected.includes(index);
    }
   

  },

    updated(){
    //  alert('updated');
     services.setquizQuestionsCached(this.dataquestions);
     services.setquiznumQuestionsAnsweredCached(this.numQuestionsAnswered);
     services.setquizactiveQuestionsCached(this.activeQuestions);
     services.setresultCached(this.result);
     services.setfinalizeCached(this.finalize);

     }
        
};
</script>

<style scoped>
    .answer{
        padding: 15px 20px;
        border-radius: 10px;
        border : 1px solid #bbb;
    }

    .answer:hover{
    cursor: pointer;
}
</style>
