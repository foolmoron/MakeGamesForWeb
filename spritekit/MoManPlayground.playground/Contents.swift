//: Playground - noun: a place where people can play

import SpriteKit
import XCPlayground

struct Constants {
	static let gameWindow = CGRect(x: 0, y: 0, width: 800, height: 600)
	static let margins = UIEdgeInsets(top: 16, left: 16, bottom: 16, right: 16)
	static let targetName = "target"
	static let playerName = "player"
	static let backgroundName = "bg"
	
	static let scoreFontName = "AppleSDGothicNeo-Regular"
	
	static let scoreAnimationTime: NSTimeInterval = 1.0
	static let scoreAnimationHeight: CGFloat = 32.0
	
	static let scorePosition = CGPoint(x: Constants.gameWindow.width / 2.0, y: Constants.gameWindow.height - 32)
}


struct Helpers {
	static func randomizePosition(inFrame frame: CGRect, withMargins margins: UIEdgeInsets) -> CGPoint {
		let randomXFactor = Double(arc4random() % 100) / 100.0
		let randomYFactor = Double(arc4random() % 100) / 100.0
		
		let randomX = Double(frame.width) * randomXFactor
		let randomY = Double(frame.height) * randomYFactor
		
		let minX = Double(margins.left)
		let maxX = Double(frame.width - margins.right)
		let minY = Double(margins.bottom)
		let maxY = Double(frame.height - margins.top)
		
		let actualX = max(min(randomX, maxX), minX)
		let actualY = max(min(randomY, maxY), minY)
		
		return CGPoint(x: actualX, y: actualY)
	}
}

class GameScene: SKScene {
	
	//MARK:- Properties
	let target = SKSpriteNode(imageNamed: Constants.targetName)
	let player = SKSpriteNode(imageNamed: Constants.playerName)
	
	let totalScoreLabel = SKLabelNode()
	var totalScore = 0
	let newScoreLabel = SKLabelNode()
	var newScore: Int {
		return Int(max(100 - currentRoundTime * currentRoundTime * 30, 1))
	}
	
	var currentRoundTime: CFTimeInterval = 0 // the amount of time the target has been onscreen since hit
	var lastUpdateTime: CFTimeInterval = 0
	
	//MARK:- Init
	override init(size: CGSize) {
		super.init(size: size)
		setup()
	}
	
	required init?(coder aDecoder: NSCoder) {
		fatalError("init(coder:) has not been implemented")
	}
	
	//MARK: Setup
	func setup() {
		setupBackground()
		setupLabels()
		setupTarget()
	}
	
	func setupBackground() {
		let background = SKSpriteNode(imageNamed: Constants.backgroundName)
		background.anchorPoint = CGPoint.zero
		addChild(background)
	}
	
	func setupLabels() {
		addChild(totalScoreLabel)
		totalScoreLabel.fontName = Constants.scoreFontName
		totalScoreLabel.text = "SCORE: \(totalScore)"
		totalScoreLabel.horizontalAlignmentMode = .Center
		totalScoreLabel.verticalAlignmentMode = .Baseline
		totalScoreLabel.position = Constants.scorePosition
		
		addChild(newScoreLabel)
		newScoreLabel.fontName = Constants.scoreFontName
		newScoreLabel.horizontalAlignmentMode = .Center
		newScoreLabel.verticalAlignmentMode = .Baseline
		newScoreLabel.alpha = 0
	}
	
	func setupTarget() {
		addChild(target)
		randomizeTargetPosition()
	}
	
	//MARK:- Gameplay
	func randomizeTargetPosition() {
		target.position = Helpers.randomizePosition(inFrame: Constants.gameWindow, withMargins: Constants.margins)
	}
	
	func startNewRound() {
		currentRoundTime = 0
		randomizeTargetPosition()
	}
	
	func targetWasHit() {
		updateScore()
		startNewRound()
	}
	
	func updateScore() {
		let score = newScore
		
		totalScore += score
		totalScoreLabel.text = "SCORE: \(totalScore)"
		
		runScoreAction(withScore: score)
	}
	
	func runScoreAction(withScore score: Int) {
		newScoreLabel.removeAllActions()
		
		newScoreLabel.alpha = 1.0
		newScoreLabel.position = target.position
		newScoreLabel.text = "+\(score)"
		
		let rise = SKAction.moveBy(CGVector(dx: 0, dy: Constants.scoreAnimationHeight), duration: Constants.scoreAnimationTime)
		let fadeOut = SKAction.fadeOutWithDuration(Constants.scoreAnimationTime)
		let group = SKAction.group([rise, fadeOut])
		group.timingMode = .EaseOut
		newScoreLabel.runAction(group)
		
	}
	
	override func update(currentTime: NSTimeInterval) {
		let deltaTime = currentTime - lastUpdateTime
		
		currentRoundTime += deltaTime
		lastUpdateTime = currentTime
	}
	
	//MARK: Input
	override func touchesBegan(touches: Set<UITouch>, withEvent event: UIEvent?) {
		for touch in touches {
			if target.frame.contains(touch.locationInNode(self)) {
				targetWasHit()
			}
		}
	}
}

//MARK:- Main
var scene = GameScene(size: Constants.gameWindow.size)
let view = SKView(frame: Constants.gameWindow)
view.presentScene(scene)

/* uncomment below to run */

//XCPlaygroundPage.currentPage.liveView = view
